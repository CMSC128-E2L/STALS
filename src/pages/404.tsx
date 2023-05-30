import NavBar from "~/components/navbar";
import error_elem from "public/images/404_element.png";

export default function Error404() {
  return (
    <div className="h-screen">
      <NavBar />

      <section className="mt-16 pt-40">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-8">
            <div>
              <img
                className="floating-image h-60 w-auto lg:h-80"
                src={error_elem.src}
                alt="aboutus"
              />
            </div>
            <div className="item-center px-10 text-center lg:text-left">
              <h1 className="text-6xl font-bold text-p-dviolet">
                Page Not Found
              </h1>
              <div className="pt-2 text-center">
                <a
                  href="homepage"
                  className="font-semibold text-black no-underline hover:text-gray-900 hover:underline"
                >
                  Click here to redirect to homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
