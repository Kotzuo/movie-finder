import SearchBar from "./SearchBar";
import "./globals.scss";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "Movie Finder",
  description: "Find your next favorite movie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header></header>
        <main>
          <div className="searchContainer">
            <div className="searchContainerHeader">
              <h3>Title</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </div>
            <SearchBar />
          </div>
          <div className="content">{children}</div>
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
