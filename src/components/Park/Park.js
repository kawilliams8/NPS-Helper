import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../actions';
import notFound from '../../assets/images/image-not-found.jpg';
import { key } from '../../containers/App/key';
import './Park.css';

export const Park = (props) => { 
  const { park } = props;
  let mapUrl = "";
  if (park.latLong) {
    const lat = park.latLong.split(" ")[0].substring(4);
    const long = park.latLong.split(" ")[1].substring(5);
    mapUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/${long},${lat}5,0,0/500x400?access_token=${key.mb_api_key}`
  }
  let img = notFound; 
  if (park.images[0].url) {
    img = park.images[0].url
  }

  return (
    <section className="Park-card">
      <img className="Park-card-image" src={img} alt={park.fullName} />
      {park.latLong && <img className="Park-card-map" src={mapUrl} alt='map' />}
      <article className="Park-card-info">
      <h2>{park.name}</h2>
      <h3>{park.fullName}</h3>
      <button onClick={() => props.addFavorite(park)}>Add to Favorites</button>
      <button onClick={() => props.removeFavorite(park)}>Remove from Favorites</button>
      <h3>Designation: {park.designation}</h3>
      <h3>Home State: {park.states}</h3>
      <h3>{park.description}</h3>
      <h3>Directions: {park.directionsInfo}</h3>
      <h3>Weather: {park.weatherInfo}</h3>
      <a href={park.url} target="_blank" rel="noopener noreferrer">Official Site</a>
        
      </article>
    </section>
  )
}

export const mapStateToProps = state => ({
  parks: state.parks,
  monts: state.monts,
  others: state.others,
  favorites: state.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: park => dispatch(addFavorite(park)),
  removeFavorite: park => dispatch(removeFavorite(park))
});

export default connect(mapStateToProps, mapDispatchToProps)(Park);