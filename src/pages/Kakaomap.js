import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./overlay.css";

const { kakao } = window;

const Overlay = styled.div`
    background-color: red;
`;

const Kakaomap = () => {
    const [mapdata, setMapdata] = useState();
    const [marker, setMarker] = useState();
    useEffect(() => {
        console.log(kakao);
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        console.log("maaaap", map);
        setMapdata(map);
    }, []);

    useEffect(() => {
        console.log("asdasddddddasd", mapdata);

        if (mapdata) {
            //markerImage
            var imageSrc =
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
            // imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

            var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize
                // imageOption
            );
            //markerImage

            var marker = new kakao.maps.Marker({
                map: mapdata,
                // position: mapdata.getCenter(),

                position: new kakao.maps.LatLng(
                    33.45120014555091,
                    126.56648561750167
                ),
                image: markerImage,
            });
            // var markertwo = new kakao.maps.Marker({
            //     map: mapdata,
            //     position: new kakao.maps.LatLng(
            //         33.45105945798047,
            //         126.57010015938617
            //     ),
            //     image: markerImage,
            // });
            var content =
                "<div class='container'>" +
                "<div class='animation'>토지</div>" +
                '<div class="overlaybox" onClick="dong()" >' +
                "<div class='markerbox'><div>ds</div><div>ds</div></div>" +
                "</div>" +
                "</div>";
            var customOverlay = new kakao.maps.CustomOverlay({
                map: mapdata,
                position: new kakao.maps.LatLng(
                    33.45105945798047,
                    126.57010015938617
                ),
                content: content,
                xAnchor: 0.3,
                yAnchor: 0.91,
            });
            setMarker(customOverlay);

            // marker.setMap(mapdata);
            // markertwo.setMap(mapdata);
            // markertwo.setMap(mapdata);
            kakao.maps.event.addListener(
                mapdata,
                "click",
                function (mouseEvent) {
                    // 클릭한 위도, 경도 정보를 가져옵니다
                    var latlng = mouseEvent.latLng;

                    // 마커 위치를 클릭한 위치로 옮깁니다
                    // markertwo.setPosition(latlng);
                }
            );
            kakao.maps.event.addListener(mapdata, "dragend", function () {
                var latlng = mapdata.getCenter();
                console.log("center", latlng);
            });

            //cluster
        }
    }, [mapdata]);

    //marker

    // mapdata.setMap(mapdata);

    // kakao.maps.event.addListener(mapdata, "click", (e) => {
    //     var latlng = e.latLng;
    //     mapdata.setPosition(latlng);
    // });
    window.dong = () => {
        //center에 위치시키기
        // let center = mapdata.getCenter();
        let markerPosition = marker.getPosition();
        // console.log("qqqqqqqq", center);
        // marker.setPosition(center);
        mapdata.panTo(markerPosition);
        console.log("dong");
        let infobox = document.querySelector(".info");
        // infobox.classList.toggle("dong");
        infobox.classList.add("dong");

        let arrow = document.querySelector(".arrow");
        arrow.classList.add("aa");

        let map = document.querySelector(".mapWrapper");
        map.classList.add("mapsize");
    };
    const ddd = () => {
        console.log("aa");
    };

    const showInfo = () => {
        let infobox = document.querySelector(".info");
        infobox.classList.toggle("dong");
        let arrow = document.querySelector(".arrow");
        arrow.classList.toggle("aa");
        let map = document.querySelector(".mapWrapper");
        map.classList.toggle("mapsize");
    };

    function displayMarker(currentPosition) {
        let marker = new kakao.maps.Marker({
            map: mapdata,
            position: currentPosition,
        });

        mapdata.setCenter(currentPosition);
    }

    const current = () => {
        // console.log(sessionStorage.getItem("currentLoacation"));
        if (sessionStorage.getItem("currentLat")) {
            const lat = sessionStorage.getItem("currentLat");
            const lon = sessionStorage.getItem("currentLon");
            let currentPosition = new kakao.maps.LatLng(lat, lon);

            displayMarker(currentPosition);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    let currentPosition = new kakao.maps.LatLng(lat, lon);
                    displayMarker(currentPosition);
                });
            } else {
                alert("gps 를 지원하지않습니다.");
            }
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                // let currentPosition = new kakao.maps.LatLng(lat, lon);

                sessionStorage.setItem("currentLat", lat);
                sessionStorage.setItem("currentLon", lon);
            });
        }
    }, []);

    return (
        <div>
            <div id="map" className="mapWrapper"></div>
            <div className="infoboxWrapper">
                <div className="info">정보</div>
                <div className="arrow" onClick={showInfo}></div>
            </div>
            <div className="buttonWrapper">
                <button onClick={current}>현재위치보기</button>
            </div>
        </div>
    );
};

export default Kakaomap;
