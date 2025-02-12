import { useEffect, useState } from "react";

function GetCurrentAddress() {
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.address) {
                            setAddress(`${data.address.road}, ${data.address.city}, ${data.address.country}`);
                        } else {
                            setError("Unable to retrieve address.");
                        }
                    })
                    .catch(() => setError("Failed to fetch address."));
            },
            (err) => setError(err.message),
            { enableHighAccuracy: true }
        );
    }, []);

    return error ? error : address || "Fetching location...";
}

export default GetCurrentAddress;
