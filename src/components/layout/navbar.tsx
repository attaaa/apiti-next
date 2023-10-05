import IconButton from "../icon/icon-button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-5">
      <div className="text-2xl font-semibold">Transaction</div>
      <IconButton name="menu" />
    </nav>
  );
}
