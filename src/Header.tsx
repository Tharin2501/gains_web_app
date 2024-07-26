export function Header() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold text-blue-600">
        This is a gains web-app
      </h1>
      <div className="text-lg font-normal text-gray-400">
        See the amount of calories you get from your {""}
        <a
          href="https://www.kassal.app/varer"
          target="_blank"
          className="text-lg font-normal text-blue-400"
        >
          grocery products
        </a>
      </div>
    </>
  );
}
