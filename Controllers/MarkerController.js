let data = api.loadXML();
let xmlDoc = new DOMParser().parseFromString(data, "application/xml");

const markerList = {
    markers: [],
    viewer: null,
 

    load: function (viewer) {
        this.viewer = viewer;
        this.markers = xmlDoc.getElementsByTagName("marker");

        for (let i = 0; i < this.markers.length; i++) {  
            this.addToViewer(this.xmlToObj(this.markers[i]));
        }
    },

    xmlToObj: function (marker) {
        let obj = {
            id: null,
            name: null,
            longitude: null,
            latitude: null,
            description: null
        }

        if(marker.attributes.length>0) {
            for (i = 0; i < marker.attributes.length; i++) {
                if(marker.attributes[i].nodeName == "id") {
                    obj.id = marker.attributes[i].nodeValue;
                }
            }
        }

        for (i = 0; i < marker.children.length; i++) {
            switch (marker.children[i].tagName) {
                case "name":
                    obj.name=marker.children[i].firstChild.nodeValue;
                    break;

                case "longitude":
                    obj.longitude=marker.children[i].firstChild.nodeValue;
                    break;

                case "latitude":
                    obj.latitude=marker.children[i].firstChild.nodeValue;
                    break;

                case "description":
                    obj.description=marker.children[i].firstChild.nodeValue;
                    break;
            }
        }
        return obj;
    },

    searchMarkers: function (name) {
        this.viewer.entities.removeAll();
        let result = xmlDoc.evaluate("//marker/name[contains(text(), '"+name+"')]/..", xmlDoc.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        let node = null;
        while (node = result.iterateNext()) {
            this.addToViewer(this.xmlToObj(node));
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