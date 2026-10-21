import { useRef, useState } from 'react';
import type { GestureMode } from '../store';
import './GestureGuide.css';

const examples: {
  id: string;
  mode: GestureMode;
  title: string;
  formation: string;
  instruction: string;
  image: string;
}[] = [
  {
    id: 'dragon-sword',
    mode: 'DRAGON',
    title: '双指剑诀',
    formation: '游龙随行',
    instruction: '食指、中指伸直，其余手指弯曲。飞剑跟随食指指尖。',
    image: 'dragon-sword.svg',
  },
  {
    id: 'dragon-gun',
    mode: 'DRAGON',
    title: '手枪手势',
    formation: '游龙随行',
    instruction: '拇指、食指伸直，中指、无名指和小指弯曲。',
    image: 'dragon-gun.svg',
  },
  {
    id: 'lotus',
    mode: 'LOTUS',
    title: '张开手掌',
    formation: '莲花现世',
    instruction: '自然张开手掌，四根长指伸直，掌心朝向摄像头。',
    image: 'lotus.svg',
  },
  {
    id: 'shield',
    mode: 'SHIELD',
    title: '握紧拳头',
    formation: '剑盾护体',
    instruction: '五指收拢握拳，让手掌完整出现在画面中。',
    image: 'shield.svg',
  },
  {
    id: 'dageng',
    mode: 'DAGENG',
    title: '摇滚手势',
    formation: '大庚剑阵',
    instruction: '食指、小指伸直，中指、无名指弯曲，拇指自然收拢。',
    image: 'dageng.svg',
  },
];

export function GestureGuide() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openGuide = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const closeGuide = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="gesture-guide-trigger"
        onClick={openGuide}
        aria-haspopup="dialog"
        aria-controls="gesture-guide"
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">✦</span> 手势示例
      </button>

      <dialog
        id="gesture-guide"
        ref={dialogRef}
        className="gesture-guide"
        aria-labelledby="gesture-guide-title"
        aria-describedby="gesture-guide-description"
        onClose={() => setIsOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((element) => element.getClientRects().length > 0);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!first || !last) return;
          if (
            (event.shiftKey && document.activeElement === first) ||
            (!event.shiftKey && document.activeElement === last)
          ) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            closeGuide();
          }
        }}
      >
        <header className="gesture-guide-header">
          <div>
            <p className="gesture-guide-eyebrow">御剑入门</p>
            <h2 id="gesture-guide-title">以手结印，以意御剑</h2>
          </div>
          <button
            type="button"
            className="gesture-guide-close"
            aria-label="关闭手势示例"
            onClick={closeGuide}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="gesture-guide-body">
          <p id="gesture-guide-description" className="gesture-guide-description">
            对照下方示意结印，保持约 0.3 秒，即可切换剑阵。
          </p>

          <div className="gesture-guide-grid">
            {examples.map((example, index) => (
              <article
                className="gesture-example"
                data-gesture={example.id}
                data-mode={example.mode}
                key={example.id}
              >
                <div className="gesture-example-visual">
                  <span className="gesture-example-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <img
                    src={`${import.meta.env.BASE_URL}gestures/${example.image}`}
                    alt={`${example.title}示意：${example.instruction}`}
                    width="320"
                    height="260"
                  />
                </div>
                <div className="gesture-example-copy">
                  <p className="gesture-example-formation">{example.formation}</p>
                  <h3>{example.title}</h3>
                  <p className="gesture-example-instruction">{example.instruction}</p>
                </div>
              </article>
            ))}
          </div>

          <footer className="gesture-guide-tips">
            <p>单手完整入镜 · 光线充足 · 建议横屏</p>
            <p>游龙请用双指或手枪手势；仅伸食指会进入护盾阵型。</p>
          </footer>
        </div>
      </dialog>
    </>
  );
}
