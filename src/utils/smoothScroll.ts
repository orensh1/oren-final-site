export const smoothScrollTo = (targetId: string, duration?: number) => {
    // duration arg is ignored in favor of native implementation for instant start
    const target = document.getElementById(targetId);
    if (!target) return;

    // Native browser smooth scroll - Starts immediately, optimized by browser
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
