
K.Plugin({
	name: 'photos',
	templates: {
		panelPlace: {
			'panelPlace_photos': { order:-8}
		},
		//markerPlace: 'markerPlace_photos',
		panelPlaceEdit: 'panelPlaceEdit_photos',		
		panelSettings: {
			'panelSettings_photos': { order:-10},
		},
		//panelProfile: 'panelProfile_photos'
	},
	schemas: {
		place: {
			//TODO editedAt: '',//last edit date
			photo: '',	//photo object for the place
			photos: []   //user creator of place
		},
		user: {
			photos: []	   //places created by user
		},
		photo: {
			title: '',         //Topic for the place wall or subject for the private convers
			url: '',
			//TODO thumburl,	//thumbnail image
			createdAt: null,
			targetId: '',      //if null is a private users convers		
			targetType: '',	   //type of target: user, place, event, pois		
			userId: '',        //owner/sender of conversation		
			loc: null,			//location
			exif: null			//exif data of photo
		}
	},
	filters: {
		currentUser: {
			fields: {
				avatar:1,
				photos:1
			}
		},
		placePanel: {
			fields: {
				photo: 1,
				photos: 1
			}
		},
		placeItem: {
			fields: {
				photo: 1
			}
		},
		friendPanel: {
			fields: {
				avatar:1,
				photos:1
			}
		}
	},
	settings: {
		/**
		 * define a targets used by plugin upload
		 */
		"upload": {
			"targets": {
				"photos_places": {
					//pass uploaded object to this method
					"method": "updatePlacePhoto",
					"maxFileSize": 8800000,
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					"imageOpts":{
						"width": 800,
						"height": 800,
						"quality": 0.25
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "/static/photos/",
					"path": ""
				},
				"photos_avatars": {
					//pass uploaded object to this method
					"method": "updateAvatar",
					"maxFileSize": 5800000,
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					"imageOpts":{
						"width": 140,
						"height": 140,
						"quality": 0.8
					},					
					//TODO rename in 'basepath' and 'baseurl'
					"url": "/static/avatars/",
					"path": ""
				}
			}
		}
	}
});
