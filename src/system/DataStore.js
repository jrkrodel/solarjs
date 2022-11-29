//Create our Data store
//Stores information we need to track throught our applicatoin
//This includes the full set of JSON Data
//Which planet we are currently viewing
//Whether we are viewing planets, the sun, or the moon.
//The path to the needed 3D asset
//The total distanced we have traveled
//The list of subscribes we update
let DataStore = {
  data: null,
  currentPlanet: null,
  active: "planets",
  assetURL: "./assets/images/mercury.glb",
  subscribers: [],
  distance: 0,
  //We call this function in app to push all the needed subscribers into the subscriber array
  subscribe: function (callback) {
    this.subscribers.push(callback);
  },
  //Runs each subscriber in the subscriber array, and trigger their functions
  updateSubscribers: function () {
    this.subscribers.forEach((callback) => {
      callback();
    });
  },
  //QueryData, takes in a queryCommand which we retrieve the URL from and then handle the returned data
  queryData: function (queryCommand) {
    fetch(queryCommand.url)
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.currentPlanet = data.planets[0];
        //Trigger the subscribers
        this.updateSubscribers();
      });
  },
  //New planet command, handles when we are switching between planets and retrieving the correct data
  newPlanet: function (newPlanetCommand) {
    //Get the index of the current planet
    const currentIndex = this.data.planets.indexOf(this.currentPlanet);
    //If we are advancing to the next planet
    if (newPlanetCommand.direction === "right") {
      //And the next planet exists
      if (this.data.planets[currentIndex + 1] !== undefined) {
        //Update the traveled distance
        this.distance += this.currentPlanet.distance;
        //Set the current planet to the next planet in the array of planets
        this.currentPlanet = this.data.planets[currentIndex + 1];
      }
      //If we are going back to a prev planet
    } else if (newPlanetCommand.direction === "left") {
      //And the prev planet exists
      if (this.data.planets[currentIndex - 1] !== undefined) {
        //We still update overall travel distance
        this.distance += this.data.planets[currentIndex - 1].distance;
        //Set current planet to the prev planet in the array of planets
        this.currentPlanet = this.data.planets[currentIndex - 1];
      }
    }
    //Get the correct Asset URL
    this.assetURL = `./assets/images/${this.currentPlanet.name}.glb`;
    //Trigger the subscribers
    this.updateSubscribers();
  },
  //Command for updating the currently active set of data
  updateActive: function (updateActiveCommand) {
    //If are current active, before changing, is planets
    if (this.active === "planets") {
      //Get the new active
      this.active = updateActiveCommand.active;
      //If are active is now sun
      if (this.active === "sun") {
        //Update distance accordingly
        this.distance += this.currentPlanet.distanceSunMiles;
        //get the Sun Asset
        this.assetURL = `./assets/images/sun.glb`;
      } else if (this.active === "moon") {
        //If our active changes to moon, update the distance accordingly
        this.distance += this.currentPlanet.distanceMoonMiles;
        //Get the moon asset
        this.assetURL = `./assets/images/moon.glb`;
      }
      //We follow this same logic for each switch in active state, adding the correct distance and getting the correct asset
    } else if (this.active === "sun") {
      this.active = updateActiveCommand.active;
      if (this.active === "planets") {
        this.distance += this.currentPlanet.distanceSunMiles;
        this.assetURL = `./assets/images/${this.currentPlanet.name}.glb`;
      } else if (this.active === "moon") {
        this.distance += this.data.sun.distanceMoonMiles;
        this.assetURL = `./assets/images/moon.glb`;
      }
    } else if (this.active === "moon") {
      this.active = updateActiveCommand.active;
      if (this.active === "planets") {
        this.distance += this.currentPlanet.distanceMoonMiles;
        this.assetURL = `./assets/images/${this.currentPlanet.name}.glb`;
      } else if (this.active === "sun") {
        this.distance += this.data.sun.distanceMoonMiles;
        this.assetURL = `./assets/images/sun.glb`;
      }
    }

    //Trigger subscribers
    this.updateSubscribers();
  },
};

//QueryCommand, gets the URL needed for fetching data
function QueryCommand(url) {
  this.url = url;
}

//NewPlanetCommand, gets the direction we are "traveling"
function NewPlanetCommand(direction) {
  this.direction = direction;
}

//UpdateActiveCommand, gets the active we have selected
function UpdateActiveCommand(active) {
  this.active = active;
}

export { DataStore, QueryCommand, NewPlanetCommand, UpdateActiveCommand };
