/* Timeline Extension JS */

(function () {

  /* ── Phase 4: Duplicate label grouping ────────────────────────
     Consecutive .event elements sharing the same data-label are
     wrapped in a .tl-group.event div that receives the shared dot
     and label. Inner events have their dot/label suppressed by CSS.
  ──────────────────────────────────────────────────────────────── */
  function groupDuplicateLabels(timeline) {
    const events = Array.from(timeline.querySelectorAll(':scope > .event'));
    if (events.length < 2) return;

    let i = 0;
    while (i < events.length) {
      const label = events[i].dataset.label;

      // Find run of consecutive events with the same label
      let j = i + 1;
      while (j < events.length && events[j].dataset.label === label) {
        j++;
      }

      if (j - i > 1) {
        const group = document.createElement('div');
        group.classList.add('event', 'tl-group');
        if (label) group.dataset.label = label;

        // Insert wrapper before the first event in the run
        timeline.insertBefore(group, events[i]);

        // Move events into the wrapper
        for (let k = i; k < j; k++) {
          group.appendChild(events[k]);
        }
      }

      i = j;
    }
  }

  /* ── Init ──────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.timeline').forEach(groupDuplicateLabels);
  });

})();
