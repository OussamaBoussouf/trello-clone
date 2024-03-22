function Header() {
  return (
    <header >
      <div className="text-center max-w-2xl mx-auto absolute top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2">
        <h1 className="font-bold text-5xl mb-5 text-transparent bg-clip-text bg-gradient-to-b from-cyan-500 to-blue-500">Welcome to Rello</h1>
        <p className="leading-7 text-gray-400">
          the ultimate solution for managing your tasks and boosting your
          productivity. With our intuitive interface and powerful features.
        </p>
      </div>
    </header>
  );
}

export default Header;
