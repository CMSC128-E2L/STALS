import NavBar from "~/components/navbar";

export default function ManageReport() {
  return (
    <>
      <div>
        <NavBar />
        <section className="flex-row-2 flex w-full">
          <div className="flex w-full flex-col rounded-3xl p-10 shadow-lg">
            <h1 className="mr-4 text-xl font-bold">Reported Accommodation</h1>
            some contents here...
          </div>
          <div className="flex w-full flex-col rounded-3xl p-10 shadow-lg">
            <h1 className="mr-4 text-xl font-bold">Reported Reviews</h1>
            some contents here...
          </div>
        </section>
      </div>
    </>
  );
}
