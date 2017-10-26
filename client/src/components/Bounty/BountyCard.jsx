import React from 'react';
import PropTypes from 'prop-types';

// Grommet Components
import {
  Tile,
  Card,
  Anchor,
  Box,
  Carousel,
  Image,
  Heading,
  Value
} from 'grommet';

// Grommet icons
import {
  EditIcon,
  SendIcon,
  MoneyIcon
} from 'grommet/components/icons/base';

import placeHolderImage from './../../images/placeholder.png';

import './../../styles/BountyCard.scss';

import data from './../../data/example-data.js';
console.log(data)

function httpify(value) {
  let string = value.trim();
  if (!/^((http|https):\/\/)/.test(value.trim())) {
    string = `http://${string}`;
  }
  return string.trim();
}


const BountyCard = props => {
  const images = data.bounties[0].images.split(',');
  const stack = data.bounties[0].stack.split(',');

  return (
    <Tile className="ProjectCard">
      {images.length === 1 &&
        images[0] !== '' && (
          <Image
            size="medium"
            style={{ width: 384, height: 280 }}
            src={httpify(images[0])}
          />
        )}
      {images.length > 1 && (
        <Box size="medium">
          <Carousel autoplay={false} style={{ width: 390, height: 284 }}>
            {images.map((image, index) => {
              const i = index;
              let imageURL = image;
              if (!image) {
                imageURL = placeHolderImage;
              } else {
                imageURL = httpify(imageURL);
              }
              return <Image key={i} size="medium" fit="cover" src={imageURL} />;
            })}
          </Carousel>
        </Box>
      )}
      <Card
        contentPad="medium"
        heading={
          <Heading strong tag="h2">
            {data.bounties[0].title}
            <EditIcon
              className="editBountyIcon"
              onClick={() => console.log('weee')}
            />
          </Heading>
        }
        description={
          <div>
            <Heading tag="h3" className="description">
              {data.bounties[0].description}
            </Heading>
            <div className="stack">
              {stack.map((el, index) => {
                const i = index;
                return el && el.trim() !== '' && <div key={i}>{el}</div>;
              })}
            </div>
            <div>
              <Value
                value={data.bounties[0].price.toLocaleString('en-IN',
                {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                icon={<MoneyIcon />}
                units='USD'
              />
            </div>
            <Anchor
              icon={<SendIcon />}
              label="Discuss Terms"
              onClick={() => console.log('clicked')}
              primary
              reverse={false}
            />
          </div>
        }
      />
    </Tile>
  );
};

BountyCard.defaultProps = {
  editBounty: () => {},
};

BountyCard.propTypes = {
  bounty: PropTypes.shape({
    id: PropTypes.number,
    images: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    stack: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  editBounty: PropTypes.func,
};

export default BountyCard;
