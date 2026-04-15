import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Image src={"./icon.svg"} width={350} height={350} alt="Logo" />
      <p className="font-sans text-lg text-black max-auto mt-5">
        DASHBOARD (eventually)
      </p>
    </div>
  );
}
