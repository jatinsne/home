//import { randomNumber } from '/js/utils';
import { gsap } from 'gsap';

const DOM = {
    frame: document.querySelector('.frame'),
    content: document.querySelector('.content'),
    enterCtrl: document.querySelector('.enter'),
    enterBackground: document.querySelector('.enter__bg'),
};

export class Intro {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.circleText = [...this.DOM.el.querySelectorAll('text.circles__text')];
        this.circleTextTotal = this.DOM.circleText.length;
        this.setup();
    }
    setup() {
        gsap.set(this.DOM.circleText, { transformOrigin: '50% 50%' });
        gsap.set([this.DOM.circleText, DOM.content.children, DOM.frame.children], {opacity: 0});
        gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});

        this.initEvents();
    }
    initEvents() {
        this.enterMouseEnterEv = () => {
            gsap.killTweensOf([DOM.enterBackground,this.DOM.circleText]);
            
            gsap.to(DOM.enterBackground, {
                duration: 0.8,
                ease: 'power4',
                scale: 1.2,
                opacity: 1
            });
            
            gsap.to(this.DOM.circleText, {
                duration: 4,
                ease: 'power4',
                rotate: '+=180',
                stagger: {
                    amount: -0.3
                }
            });
        };
        this.enterMouseLeaveEv = () => {
            gsap.to(DOM.enterBackground, {
                duration: 0.8,
                ease: 'power4',
                scale: 1
            });
        };
        this.enterClickEv = () => this.enter();
        
        DOM.enterCtrl.addEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.addEventListener('mouseleave', this.enterMouseLeaveEv);
        DOM.enterCtrl.addEventListener('click', this.enterClickEv);
    }
    start() {
        this.startTL = gsap.timeline()
        .addLabel('start', 0)
        .to([this.DOM.circleText, DOM.enterCtrl], {
            duration: 2.5,
            ease: 'expo',
            startAt: {opacity: 0, scale: 0.3},
            scale: 1,
            opacity: 1,
            stagger: {
                amount: 0.5
            }
        }, 'start')
        .add(() => gsap.set(DOM.enterCtrl, {pointerEvents: 'auto'}), 'start+=1');
    }
    enter() {
        this.startTL.kill();
        DOM.enterCtrl.removeEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.removeEventListener('mouseleave', this.enterMouseLeaveEv);
        DOM.enterCtrl.removeEventListener('click', this.enterClickEv);
        gsap.set(DOM.enterCtrl, {pointerEvents: 'none'});
        gsap.set([DOM.frame, DOM.content], {opacity: 1});
        gsap.timeline()
        .addLabel('start', 0)
        .to(DOM.enterCtrl, {
            duration: 1.5,
            ease: 'expo.inOut',
            scale: 0.7,
            opacity: 0
        }, 'start')
        .to(this.DOM.circleText, {
            duration: 1.5,
            ease: 'expo.inOut',
            scale: i => 1.5+(this.circleTextTotal-i)*.3,
            opacity: 0,
            stagger: {
                amount: 0.2
            }
        }, 'start')
        .to([DOM.content.children, DOM.frame.children], {
            duration: 1,
            ease: 'power3.out',
            startAt: {opacity: 0, scale: 0.9},
            scale: 1,
            opacity: 1,
            stagger: {
                amount: 0.3
            }
        }, 'start+=1.1')
    }
}