// Context
import Weather from "./components/Weather";
import WeatherResult from "./components/WeatherResult";
import WeatherProvider from "./Provider/weather_context";

function App() {
  return (
    <WeatherProvider>
      <main className="grid grid-cols-12 min-h-screen p-4 gap-2 bg-slate-900 max-w-7xl md:mt-4 mx-auto">
        <section className="relative flex flex-col items-center rounded-md p-4 py-10 md:px-1 col-span-12 md:col-span-6 bg-slate-800 shadow-md">
          <Weather />
        </section>
        <section className="flex flex-col items-center rounded-md p-4 md:px-1 col-span-12 md:col-span-6 shadow-md">
          <WeatherResult />
        </section>
      </main>
    </WeatherProvider>
  );
}

export default App;
