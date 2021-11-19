export const watchChangeTitle = (
  handler: (mutation: MutationRecord) => void
) => {
  const target = document.querySelector("title")!;
  const observer = new MutationObserver((mutations) =>
    mutations.forEach(handler)
  );

  observer.observe(target, {
    childList: true,
  });

  return observer;
};
