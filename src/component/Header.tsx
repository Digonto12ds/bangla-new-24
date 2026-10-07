import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";


const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
<header className="mx-auto w-full max-w-7xl px-4 py-4">
  <div className="grid grid-cols-3 items-center">

    {/* Left empty space */}
    <div></div>

    {/* Logo + Name - CENTER */}
    <div className="flex items-center justify-center gap-2">
      <Image
        src="/logo.webp"
        alt="Bangla News 24"
        width={40}
        height={40}
        priority
      />

      <div className="flex flex-col items-start">
        <span className="text-2xl font-bold text-red-700">
          Bangla News 24
        </span>

        <span className="text-xs text-neutral-500">
          {date}
        </span>
      </div>
    </div>

    {/* Buttons - RIGHT */}
    <UserInfo/>
    
  </div>

  <NavLinks />
</header>
  );
};

export default Header;
