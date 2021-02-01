import { LitElement, css, html, customElement, property, internalProperty } from 'lit-element';

import './score-results';

@customElement('report-card')
export class ReportCard extends LitElement {
  @property() results: any | undefined;

  @internalProperty() maniScore = 0;
  @internalProperty() swScore = 0;
  @internalProperty() securityScore = 0;

  static get styles() {
    return css`
      :host {
        width: 100%;
        display: block;
      }

      #report-header {
        margin-bottom: 4em;
        margin-top: 4em;
      }

      #report-content {
        --neutral-foreground-hover: black;
      }

      .accordion-heading-block {
        width: 96vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      h3,
      .accordion-heading,
      .accordion-score,
      #overall-score {
        font-size: var(--medium-font-size);
        font-weight: var(--font-bold);
      }

      .accordion-score {
        margin-right: 12px;
      }

      fast-accordion-item,
      fast-accordion {
        --neutral-divider-rest: #e5e5e5;
      }

      fast-accordion-item::part(button) {
        height: 6em;
      }

      .flipper-button {
        background: white;
        box-shadow: 0 1px 4px 0px rgb(0 0 0 / 25%);
        border-radius: 50%;
        color: #5231A7;

        width: 32px;
      }

      .flipper-button ion-icon {
        pointer-events: none;
      }

      .flipper-button::part(control) {
        font-size: 22px;
      }

      .flipper-button::part(content) {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .score-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .options-button {
        width: 217px;
        float: right;
        margin-right: 4em;
      }

      .options-button::part(underlying-button) {
        background: white;
        color: var(--font-color);
      }

      #overall-score #total-score {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-right: 1.8em;
      }

      #overall-score #total-score h4 {
        font-size: var(--medium-font-size);
      }

      #package-block {
        display: flex;
        justify-content: flex-end;
      }

      #package-block {
        app-button {
          width: 152px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  opened(targetEl: EventTarget) {
    console.log(targetEl);

    if (targetEl) {
      const flipperButton = (targetEl as Element).classList.contains('flipper-button') ? (targetEl as Element) : (targetEl as Element).querySelector(
        '.flipper-button'
      );

      if (flipperButton) {
        if (flipperButton.classList.contains('opened')) {
          
          flipperButton.animate(
            [
              {
                transform: 'rotate(0deg)'
              }
            ],
            {
              duration: 200,
              fill: "forwards"
            }
          )

          flipperButton.classList.remove('opened');
        } else {
          flipperButton.classList.add('opened');

          flipperButton.animate(
            [
              {
                transform: 'rotate(0deg)',
              },
              {
                transform: 'rotate(90deg)',
              },
            ],
            {
              duration: 200,
              fill: 'forwards',
            }
          );
        }
      }
    }
  }

  handleManiScore(ev: CustomEvent) {
    if (ev && ev.detail.score) {
      this.maniScore = ev.detail.score;
    }
    else {
      this.maniScore = 0;
    }
  }

  handleSWScore(ev: CustomEvent) {
    if (ev && ev.detail.score) {
      this.swScore = ev.detail.score;
    }
    else {
      this.swScore = 0;
    }
  }

  handleSecurityScore(ev: CustomEvent) {
    if (ev && ev.detail.score) {
      this.securityScore = ev.detail.score;
    }
    else {
      this.securityScore = 0;
    }
  }

  openManiOptions() {
    const event = new CustomEvent('open-mani-options', {
      detail: {
        open: true
      },
    });
    this.dispatchEvent(event);
  }

  openSWOptions() {
    const event = new CustomEvent('open-sw-options', {
      detail: {
        open: true
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div>
        <div id="report-header">
          <h3>The Scoop</h3>

          <p>
            Ready to build your PWA? Tap "Build My PWA" to package your PWA for
            the app stores or tap "Feature Store" to check out the latest web
            components from the PWABuilder team to improve your PWA even
            further!
          </p>
        </div>

        <div id="report-content">
          <fast-accordion>
            <fast-accordion-item
              @click="${(ev: Event) => this.opened(ev.target)}"
            >
              <div class="accordion-heading-block" slot="heading">
                <span class="accordion-heading">Manifest</span>

                <div class="score-block">
                  <span class="accordion-score">${this.maniScore} / 80</span>

                  <fast-button class="flipper-button" mode="stealth">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                  </fast-button>
                </div>
              </div>

              <app-button @click="${() => this.openManiOptions()}" class="options-button">Manifest Options</app-button>

              <score-results
                .testResults="${this.results.manifest}"
                @scored="${(ev) => this.handleManiScore(ev)}"
              ></score-results>
            </fast-accordion-item>
            <fast-accordion-item
              @click="${(ev: Event) => this.opened(ev.target)}"
            >
              <div class="accordion-heading-block" slot="heading">
                <span class="accordion-heading">Service Worker</span>

                <div class="score-block">
                  <span class="accordion-score">${this.swScore} / 20</span>

                  <fast-button class="flipper-button" mode="stealth">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                  </fast-button>
                </div>
              </div>

              <app-button @click="${() => this.openSWOptions()}" class="options-button">Service Worker Options</app-button>
              
              <score-results
                .testResults="${this.results.service_worker}"
                @scored="${(ev) => this.handleSWScore(ev)}"
              ></score-results>
            </fast-accordion-item>
            <fast-accordion-item
              @click="${(ev: Event) => this.opened(ev.target)}"
            >
              <div class="accordion-heading-block" slot="heading">
                <span class="accordion-heading">Security</span>

                <div class="score-block">
                  <span class="accordion-score">${this.securityScore} / 15</span>

                  <fast-button class="flipper-button" mode="stealth">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                  </fast-button>
                </div>
              </div>
              
              <score-results
                .testResults="${this.results.security}"
                @scored="${(ev) => this.handleSecurityScore(ev)}"
              ></score-results>
            </fast-accordion-item>
          </fast-accordion>
        </div>

        <div id="overall-score">
          <div id="total-score">
            <h4>Total Score</h4>

            <span id="overall-score">00 / 100</span>
          </div>

          <div id="package-block">
            <app-button>Package</app-button>
          </div>
        </div>
      </div>
    `;
  }
}
