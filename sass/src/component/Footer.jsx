import React from 'react'

function Footer() {
  return (
    <footer class="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-gray-800/70">
    <div class="flex items-center gap-8">
        <a href="#" class="font-medium text-gray-500 hover:text-black transition-all">
            Home
        </a>
        <a href="#" class="font-medium text-gray-500 hover:text-black transition-all">
            About
        </a>
        <a href="#" class="font-medium text-gray-500 hover:text-black transition-all">
            Services
        </a>
        <a href="#" class="font-medium text-gray-500 hover:text-black transition-all">
            Contact
        </a>
        <a href="#" class="font-medium text-gray-500 hover:text-black transition-all">
            Help
        </a>
    </div>
    <div class="flex items-center gap-4 mt-8 text-indigo-500">
        <a href="https://www.facebook.com/profile.php?id=100041755029382" class="hover:-translate-y-0.5 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>
       
        <a href="https://www.linkedin.com/in/ahmed-mustapha-2b2b23314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" class="hover:-translate-y-0.5 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>
       
        <a href="https://github.com/ahmedmustaphaa" class="hover:-translate-y-0.5 transition-all duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>
    </div>
    <p class="mt-8 text-center">Copyright © 2025 <a href="https://prebuiltui.com">ahmed mustafa</a>. All rights reservered.</p>
</footer>
  )
}

export default Footer
