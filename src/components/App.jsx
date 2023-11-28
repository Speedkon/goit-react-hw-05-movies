import { Route, Routes } from 'react-router-dom'; 
import { AppLayout } from './AppLayout/AppLayout';
// import { Reviews } from "./Reviews/Reviews";
// import { Cast } from "./Cast/Cast";
import { Suspense, lazy } from "react";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesDetailsPage = lazy(() => import("../pages/MoviesDetailsPage/MoviesDetailsPage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const Cast = lazy(() => import("./Cast/Cast"));
const Reviews = lazy(() => import("./Reviews/Reviews"));

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MoviesDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Suspense>
  )
}
