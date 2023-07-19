import "./Home.scss";
// Bootstrap
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const Home = () => {
  return (
    <div id="home">
      {/* <div id="home-header">
        <h1>Blog App</h1>
      </div> */}

      <Carousel>
        <Carousel.Item>
          <Image src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" fluid />
          <Carousel.Caption>
            <h3>Create Posts</h3>
            <p>Share your thoughts and ideas with other users.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" fluid />
          <Carousel.Caption>
            <h3>Be apart of the community</h3>
            <p>Follow other users and interact with posts through likes & comments.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" fluid />
          <Carousel.Caption>
            <h3>Enjoy yourself</h3>
            <p>At the end of the day, it's about having a good experience.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Home;