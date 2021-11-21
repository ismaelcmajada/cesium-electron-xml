const markerList = {
    markers: [],
    viewer: null,


    load: function (viewer) {
        this.viewer = viewer;
        let data = api.loadXML();
        let xmlDoc = new DOMParser().parseFromString(data, "application/xml");
        this.markers = xmlDoc.getElementsByTagName("marker");

        for (let i = 0; i < this.markers.length; i++) {  
            let marker = {
                id: this.markers[i].attributes[0].nodeValue,
                name: this.markers[i].children[0].firstChild.nodeValue,
                longitude: this.markers[i].children[1].firstChild.nodeValue,
                latitude: this.markers[i].children[2].firstChild.nodeValue,
                description: this.markers[i].children[3].firstChild.nodeValue,
            }
            this.addToViewer(marker);
        }
    },

    addToViewer: function (marker) {
        return this.viewer.entities.add({
            id: marker.id,
            name: marker.name,
            position: Cesium.Cartesian3.fromRadians(marker.longitude, marker.latitude),
            description: marker.description,
            point: {
                pixelSize: 5,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
            },
            label: {
                text: marker.name,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new Cesium.Cartesian2(0.0, -30),
                scale: 0.75,
                fillColor: Cesium.Color.YELLOW,
                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                    1.5e2,
                    3.0,
                    1.5e7,
                    0.5
                ),
            }
        })
    }
}