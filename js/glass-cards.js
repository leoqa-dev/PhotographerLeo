(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const maxDrag = 110;
    let activeCard = null;
    let topLayer = 20;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function setCardPosition(card, x, y) {
        card.style.setProperty('--drag-x', `${x}px`);
        card.style.setProperty('--drag-y', `${y}px`);
        card.dataset.dragX = String(x);
        card.dataset.dragY = String(y);
    }

    function resetCard(card) {
        setCardPosition(card, 0, 0);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--card-scale', '1');
        card.classList.remove('is-dragging');
    }

    function updateHighlight(card, event) {
        const rect = card.getBoundingClientRect();
        const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
        const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
        const rotateY = (x - 50) / 14;
        const rotateX = (50 - y) / 18;

        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
        if (!reduceMotion) {
            card.style.setProperty('--tilt-x', `${rotateX}deg`);
            card.style.setProperty('--tilt-y', `${rotateY}deg`);
        }
    }

    function beginDrag(card, event) {
        if (!finePointer || reduceMotion || event.button !== 0) return;
        const currentX = Number(card.dataset.dragX || 0);
        const currentY = Number(card.dataset.dragY || 0);
        activeCard = {
            card,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: currentX,
            originY: currentY
        };
        card.setPointerCapture(event.pointerId);
        card.classList.add('is-dragging');
        card.style.zIndex = String(topLayer);
        topLayer += 1;
        card.style.setProperty('--card-scale', '1.018');
        event.preventDefault();
    }

    function moveDrag(event) {
        if (!activeCard) return;
        const { card, startX, startY, originX, originY } = activeCard;
        const x = clamp(originX + event.clientX - startX, -maxDrag, maxDrag);
        const y = clamp(originY + event.clientY - startY, -maxDrag, maxDrag);
        setCardPosition(card, x, y);
        updateHighlight(card, event);
    }

    function endDrag(event) {
        if (!activeCard) return;
        const { card, pointerId } = activeCard;
        if (event.pointerId === pointerId && card.hasPointerCapture(pointerId)) {
            card.releasePointerCapture(pointerId);
        }
        card.classList.remove('is-dragging');
        card.style.setProperty('--card-scale', '1');
        activeCard = null;
    }

    function setupCard(card) {
        if (card.dataset.glassReady === 'true') return;
        card.dataset.glassReady = 'true';
        card.style.setProperty('--drag-x', '0px');
        card.style.setProperty('--drag-y', '0px');
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--card-scale', '1');
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '20%');

        card.addEventListener('pointermove', event => updateHighlight(card, event));
        card.addEventListener('pointerdown', event => beginDrag(card, event));
        card.addEventListener('dblclick', () => resetCard(card));
    }

    function setup() {
        const cards = Array.from(document.querySelectorAll('.draggable-card'));
        cards.forEach(setupCard);
        if (document.body.dataset.glassEventsReady !== 'true') {
            document.body.dataset.glassEventsReady = 'true';
            document.addEventListener('pointermove', moveDrag);
            document.addEventListener('pointerup', endDrag);
            document.addEventListener('pointercancel', endDrag);
        }
        document.querySelectorAll('[data-reset-glass]').forEach(button => {
            if (button.dataset.resetReady === 'true') return;
            button.dataset.resetReady = 'true';
            button.addEventListener('click', () => {
                document.querySelectorAll('.draggable-card').forEach(resetCard);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', setup);
    window.LeoGlassCards = { setup, resetCard };
}());
