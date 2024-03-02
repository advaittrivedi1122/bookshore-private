import Navbar from '../components/Navbar';
import AllPdfCard from '../components/AllPdfCard';

const Home = () => {

    return (
        <div>
            <Navbar isLogin={false} />
            <AllPdfCard />
        </div>
    )
}

export default Home;