(() => {
  const root = document.querySelector("[data-filter-root]");
  if (!root) return;

  const filters = [...root.querySelectorAll("[data-filter]")];
  const items = [...root.querySelectorAll("[data-filter-item]")];
  const count = root.querySelector("[data-visible-count]");

  const applyFilters = () => {
    const values = Object.fromEntries(filters.map((filter) => [filter.dataset.filter, filter.value]));
    let visible = 0;

    for (const item of items) {
      const statusMatch = values.status === "all" || item.dataset.status === values.status;
      const topicMatch = values.topic === "all" || item.dataset.topics.split(" ").includes(values.topic);
      item.hidden = !(statusMatch && topicMatch);
      if (!item.hidden) visible += 1;
    }

    if (count) count.textContent = String(visible);
  };

  for (const filter of filters) filter.addEventListener("change", applyFilters);
  applyFilters();
})();
