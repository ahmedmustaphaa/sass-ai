import React, { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './component/navbar';
import Home from './pages/Home';

const Layout = lazy(() => import('./dashboard/Layout'));
const Dashboard = lazy(()=>import('./dashboard/Dashboard'))
const RemoveObject = lazy(() => import('./dashboard/RemoveObject'));
const BlogTitles = lazy(() => import('./dashboard/BlogTitles'));
const ReviewResume = lazy(() => import('./dashboard/ReviewResume'));
const Community = lazy(() => import('./dashboard/Community'));
const Writearticle = lazy(() => import('./dashboard/Writearticle'));
const GenerteImages = lazy(() => import('./dashboard/GenerteImages'));
const RemoveImage = lazy(() => import('./dashboard/RemoveImage'));

function App() {
  const location = useLocation();
  const isOwner = location.pathname.startsWith('/ai');

  return (
    <div>
      {!isOwner && <Navbar />}

      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Dashboard Routes */}
          <Route path="/ai" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="write" element={<Writearticle />} />
            <Route path="blog-titles" element={<BlogTitles />} />
            <Route path="images" element={<GenerteImages />} />
            <Route path="remove-bg" element={<RemoveImage />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review" element={<ReviewResume />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
