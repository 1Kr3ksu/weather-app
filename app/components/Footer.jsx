export default function Footer() {
  return (
    <footer className="text-center py-4 text-gray-600 bg-gray-100 border-t mt-8 text-sm">
      Dane pogodowe:{" "}
      <a
        href="https://www.weatherapi.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-600"
      >
        WeatherApi  
      </a>
    </footer>
  );
}