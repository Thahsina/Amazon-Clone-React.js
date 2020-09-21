import React from "react";
import Product from "./Product";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt="https://images-eu.ssl-images-amazon.com/images/G/02/UK-hq/2020/img/X_Site/XCM_Manual_ORIGIN_1239366_1269402_UK_uk_eoss_heroassets_onsitegraphics_uk_gb_en_3247494_1500x600_1X_en_GB._CB407071252_.jpg"
      />
      <div className="home__row">
        {/* Product 1 */}
        <Product
          id="723213417"
          title="Soft Skills: The software developer's life manual Paperback"
          price={19.24}
          rating={5}
          image="https://m.media-amazon.com/images/I/51WiLueukSL._AC_UY218_.jpg"
        />
        {/* Product 2 */}
        <Product
          id="49538034"
          title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl, Removabl"
          price={339.0}
          rating={3}
          image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX679_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="23445930"
          title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
          price={54.99}
          rating={4}
          image="https://m.media-amazon.com/images/I/91B+xrXdD+L._AC_UY218_.jpg"
        />

        <Product
          id="3254354345"
          title="Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band"
          price={429.0}
          rating={2}
          image="https://m.media-amazon.com/images/I/71j0Ezz6PnL._AC_UY218_.jpg"
        />

        <Product
          id="923213742"
          title="Eufy Robot Vacuum Cleaner [BoostIQ] RoboVac 30C, Wi-Fi, Super-Thin, 1500Pa Suction, Boundary Strips Included, Quiet, Self-Charging Robotic Vacuum Cleaner, Cleans Hard Floors to Medium-Pile Carpets"
          price={169.99}
          rating={1}
          image="https://images-na.ssl-images-amazon.com/images/I/71DQEO0rXVL._AC_SX679_.jpg"
        />
      </div>

      <div className="home__row">
        <Product
          id="90829332"
          title="Samsung LC49HG90DMUXEN 49 Curved Ultra Wide LED Monitor - 3840 x 1080, 144Hz, 1ms, Quantum Dot, Freesync, 2 x HDMI, Displayport, USB"
          price={799.99}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._AC_SX679_.jpg"
        />
      </div>
    </div>
  );
}

export default Home;
