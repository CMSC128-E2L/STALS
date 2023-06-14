import NavBar from "~/components/navbar";
import bg from "public/images/background_management.png";

{
  /* DEV PICS */
}
import van from "public/images/devs/Van.png";
import alphonse from "public/images/devs/Alphonse.png";
import alfred from "public/images/devs/Alfred.jpg";
import asha from "public/images/devs/Asha.jpg";
import jomi from "public/images/devs/Jomi.jpg";
import joseph from "public/images/devs/Joseph.jpg";
import joshua from "public/images/devs/Joshua.jpeg";
import kath from "public/images/devs/Kath.jpg";
import kurt from "public/images/devs/Kurt.jpg";
import marian from "public/images/devs/Marian.jpg";
import oliver from "public/images/devs/Oliver.jpg";
import clarissa from "public/images/devs/Clarissa.jpg";
import grendel from "public/images/devs/Grendel.jpg";
import will from "public/images/devs/Will.jpg";
import sadie from "public/images/devs/Sadie.jpg";
import jamie from "public/images/devs/Jamie.jpg";
import kong from "public/images/devs/Kong.jpg";
import ash from "public/images/devs/Ash.jpg";
import sircarl from "public/images/devs/sircarl.png";
import sirreg from "public/images/devs/sirreg.png";

export default function DevsPage() {
  return (
    <div>
      <NavBar />
      <img className="site-background" src={bg.src} alt="background" />

      <div className="mb-12">
        <div className="mt-12 flex justify-center p-2 text-3xl font-bold text-white">
          <h2 className="rounded-xl border border-p-vdviolet bg-p-dviolet p-3 drop-shadow-md">
            PROJECT LEADERS
          </h2>
        </div>
        <div className="pad-4 mt-1 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <div className="w-lg mx-2 transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={clarissa.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-xl font-semibold">
              Clarissa Rodriguez
            </h2>
            <p className="mt-1 text-center text-gray-600">Project Manager</p>
          </div>

          <div className="w-sm mx-2 transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={alphonse.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-lg font-semibold">
              Alphonse Del Mundo
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Team Leader - Frontend
            </p>
          </div>

          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={grendel.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Grendel Napiza
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Team Leader - Backend
            </p>
          </div>

          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-cover shadow-sm"
              src={will.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Will Borromeo
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Team Leader - Database
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center p-2 text-3xl font-bold text-white">
          <h2 className="rounded-xl border border-p-vdviolet bg-p-dviolet p-3 drop-shadow-md">
            FRONT END
          </h2>
        </div>
        <div className="pad-4 mt-1 flex flex-col items-center justify-center  gap-2 sm:flex-row">
          <div className="w-sm mx-2 transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={alphonse.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-lg font-semibold">
              Alphonse Del Mundo
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Team Leader - Frontend
            </p>
          </div>
          <div className="w-lg mx-2 transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={alfred.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-xl font-semibold">
              Alfred Arellano
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Frontend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={sadie.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-xl font-semibold">
              Samantha Beltran
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Frontend
            </p>
          </div>
        </div>
        <div className="pad-4 mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={jamie.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-xl font-semibold">
              Jamie Ciron
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Frontend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={kong.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-xl font-semibold">
              Kong Rodriguez
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Frontend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={marian.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-xl font-semibold">
              Marian Vergara
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Frontend
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center p-2 text-3xl font-bold text-white">
          <h2 className="rounded-xl border border-p-vdviolet bg-p-dviolet p-3 drop-shadow-md">
            BACK END
          </h2>
        </div>
        <div className="pad-4 mt-1 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={grendel.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Grendel Napiza
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Team Leader - Backend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={asha.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Alissha Cardona
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Backend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={van.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Van Paul Dayag
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Backend
            </p>
          </div>
        </div>
        <div className="pad-4 mt-4 flex  flex-col items-center justify-center  gap-2 sm:flex-row">
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={joshua.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Joshua Esguerra
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Backend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={ash.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Ash Garcia
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Backend
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={jomi.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              John Michael Raqueño
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Backend
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center p-2 text-3xl font-bold text-white">
          <h2 className="rounded-xl border border-p-vdviolet bg-p-dviolet p-3 drop-shadow-md">
            DATABASE
          </h2>
        </div>
        <div className="pad-4 mt-1 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-cover shadow-sm"
              src={will.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Will Borromeo
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Team Leader - Database
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={kath.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Kath Cabrera
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Database
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={oliver.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Oliver Marquez
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Database
            </p>
          </div>
        </div>
        <div className="pad-4 mt-4 flex  flex-col items-center justify-center gap-2 sm:flex-row">
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={kurt.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Kurt Punzalan
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Database
            </p>
          </div>
          <div className="mx-2 max-w-sm transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
            <img
              className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
              src={joseph.src}
              alt=""
            />
            <h2 className="mt-3 text-center text-2xl font-semibold">
              Joseph Sta. Rita
            </h2>
            <p className="mt-1 text-center text-gray-600">
              Developer - Database
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center p-2 text-3xl font-bold text-white">
        <h2 className="rounded-xl border border-p-vdviolet bg-p-dviolet p-3 drop-shadow-md">
          INSTRUCTORS
        </h2>
      </div>
      <div className="pad-4 mb-12 mt-1 flex flex-col items-center  justify-center gap-2 sm:flex-row">
        <div className="w-sm mx-2 transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
          <img
            className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
            src={sircarl.src}
            alt=""
          />
          <h2 className="mt-3 text-center text-lg font-semibold">
            Carl Angcana
          </h2>
          <p className="mt-1 text-center text-gray-600">Instructor</p>
        </div>
        <div className="w-lg mx-2 transform rounded-lg bg-white p-5 shadow-md duration-300 hover:scale-105">
          <img
            className="mx-auto h-60 w-60 rounded-full object-scale-down shadow-sm"
            src={sirreg.src}
            alt=""
          />
          <h2 className="mt-3 text-center text-xl font-semibold">
            Reginald Recario
          </h2>
          <p className="mt-1 text-center text-gray-600">Assistant Professor</p>
        </div>
      </div>
    </div>
  );
}
