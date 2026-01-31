export const smoothScrollTo = (targetId: string, duration: number = 2000) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // EaseOutCubic - Starts fast, decelerates gently
    const ease = (t: number, b: number, c: number, d: number) => {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    };

    requestAnimationFrame(animation);
};
