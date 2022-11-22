let DataStore = {
  data: null,
  currentPlanet: null,
  active: "planets",
  assetURL: "./assets/images/mercury.glb",
  subscribers: [],
  distance: 0,
  subscribe: function (callback) {
    this.subscribers.push(callback);
  },
  updateSubscribers: function () {
    this.subscribers.forEach((callback) => {
      callback();
    });
  },
  queryData: function (queryCommand) {
    fetch(queryCommand.url)
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.currentPlanet = data.planets[0];
        this.updateSubscribers();
      });
  },
  newPlanet: function (newPlanetCommand) {
    const currentIndex = this.data.planets.indexOf(this.currentPlanet);
    if (newPlanetCommand.direction === "right") {
      if (this.data.planets[currentIndex + 1] !== undefined) {
        this.distance += this.currentPlanet.distance;
        console.log(typeof this.currentPlanet.distance);
        console.log(this.distance);
        this.currentPlanet = this.data.planets[currentIndex + 1];
      }
    } else if (newPlanetCommand.direction === "left") {
      if (this.data.planets[currentIndex - 1] !== undefined) {
        this.distance += this.data.planets[currentIndex - 1].distance;

        console.log(this.distance);
        this.currentPlanet = this.data.planets[currentIndex - 1];
      }
    }
    this.assetURL = `./assets/images/${this.currentPlanet.name}.glb`;
    this.updateSubscribers();
  },
  updateActive: function (updateActiveCommand) {
    if (this.active === "planets") {
      this.active = updateActiveCommand.active;
      if (this.active === "sun") {
        console.log("to sun");
        console.log(this.assetURL);
        this.distance += this.currentPlanet.distanceSunMiles;
        this.assetURL = `./assets/images/sun.glb`;
      } else if (this.active === "moon") {
        this.distance += this.currentPlanet.distanceMoonMiles;
        this.assetURL = `./assets/images/moon.glb`;
      }
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

    // if (updateActiveCommand.active === "sun") {
    //   this.assetURL = `./assets/images/sun.glb`;
    //   this.distance += this.currentPlanet.distanceSunMiles;
    // } else if (updateActiveCommand.active === "moon") {
    //   this.assetURL = `./assets/images/moon.glb`;
    //   this.distance += this.currentPlanet.distanceMoonMiles;
    // } else {
    //   this.distance += this.currentPlanet.distanceSunMiles;
    //   console.log("added");
    //   this.assetURL = `./assets/images/${this.currentPlanet.name}.glb`;
    // }
    this.updateSubscribers();
  },
};

function QueryCommand(url) {
  this.url = url;
}

function NewPlanetCommand(direction) {
  this.direction = direction;
}

function UpdateActiveCommand(active) {
  this.active = active;
}

export { DataStore, QueryCommand, NewPlanetCommand, UpdateActiveCommand };
