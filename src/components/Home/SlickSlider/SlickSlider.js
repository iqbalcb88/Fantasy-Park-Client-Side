import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import img1 from '../../../images/slickSlider/1.png';
import img2 from '../../../images/slickSlider/2.png';
import img3 from '../../../images/slickSlider/3.png';
import img4 from '../../../images/slickSlider/4.png';
import img5 from '../../../images/slickSlider/5.png';
import img6 from '../../../images/slickSlider/6.png';

export default class CenterMode extends Component {
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 2000,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <Container fluid className='px-5 py-3 bg-info'>
        <h4 className='text-white text-center'>Gallery</h4>
        <Slider {...settings}>
          {[img1, img2, img3, img4, img5, img6].map((item, index) => {
            return (
              <React.Fragment>
                <Col>
                  <Card>
                    <div className='slick-slider'>
                      <Card.Img variant='top' key={index} src={item}></Card.Img>
                    </div>
                  </Card>
                </Col>
              </React.Fragment>
            );
          })}
          {/* <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div> */}
        </Slider>
      </Container>
    );
  }
}
