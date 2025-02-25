import ArticlePart from "../components/body/articlePart";
import ContactUs from "../components/body/contactUs";
import Footer from "../components/footer/footer";
import NavBar from "../components/header/navbar";
import BlogPage from "./blogpage";


const Page = () => {
  return (
    <main>
      {/* Fixed NavBar at the top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar/>
      </div>

      {/* Add padding-top to the first section to prevent content from being hidden behind the NavBar */}
      <div className="pt-20"> {/* Adjust padding-top based on NavBar height */}
       <BlogPage/>
<ArticlePart/>
<ContactUs/>
<Footer/>
      </div>
    </main>
  );
};

export default Page;