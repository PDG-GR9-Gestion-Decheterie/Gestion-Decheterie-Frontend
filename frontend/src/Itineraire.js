import React, { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { getApiKey } from "./Endpoints";

export default function Itineraire() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      const response = await getApiKey();
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.APIKey);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchApiKey();
  }, []);

  return (
    <APIProvider
      apiKey={"AIzaSyAcp4rBpazZ3oH9sR_eucOsfjjcyl5JKLo"}
      onLoad={() => console.log(apiKey)}
    >
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
      ></Map>
    </APIProvider>
  );
}
