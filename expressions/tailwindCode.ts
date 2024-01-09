export const defaultTailwind = {
  theme: {
    extend: {},
  },
};

export const cssDefault = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

export const htmlBody = `
<div class="flex justify-center py-5">
<div class="max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <img class="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1682687982046-e5e46906bc6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card Image">
        <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-800">Tailwind Playcode</h2>
            <p class="text-gray-600 mt-2">A simple card created using Tailwind CSS. Play around with the code to customize it to your liking.</p>
        </div>
        <div class="bg-gray-100 py-3 px-6 flex justify-between items-center">
            <span class="text-sm text-gray-600">Author: Code Playfield</span>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Read More</button>
        </div>
    </div>
</div>
`;
