import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AnalyticsBehavior, recordPWABuilderProcessStep } from '../utils/analytics';
import { manifest_fields } from '../utils/manifest-info';

import {
  smallBreakPoint,
  mediumBreakPoint,
  largeBreakPoint,
  xLargeBreakPoint,
  xxxLargeBreakPoint,
} from '../utils/css/breakpoints';
import { SlDropdown } from '@shoelace-style/shoelace';

@customElement('manifest-info-card')
export class ManifestInfoCard extends LitElement {
  @property({ type: String }) field: string = "";

  static get styles() {
    return [
    css`

      .mic-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .info-box {
        background-color: var(--font-color);
        max-width: 340px;
        color: #ffffff;
        padding: 10px;
        border-radius: var(--card-border-radius);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .info-box p {
        margin: 0;
        font-size: 16px;
      }

      .right {
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .right:hover {
        cursor: pointer;
      }

      .image-section {
        background: linear-gradient(93.16deg, #EAECF4 16%, #CED0EC 87.75%);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .image-section img {
        padding: 10px 20px;
        width: 300px;
        height: auto;
      }

      .mic-actions {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 5px;
      }

      .mic-actions a {
        color: #ffffff;
        font-size: 16px;
      }

      .mic-actions a:visited, .mic-actions a:active, .mic-actions a:link {
        color: #ffffff;
        font-weight: bold;
      }

      .mic-actions button {
        background-color: transparent;
        border: none;
        color: #ffffff;
        border-bottom: 2px solid #ffffff;
        padding: 0;
      }

      .mic-actions button:hover {
        cursor: pointer; 
      }


      /* < 480px */
      ${smallBreakPoint(css`
      `)}

      /* 480px - 639px */
      ${mediumBreakPoint(css`
      `)}

      /* 640px - 1023px */
      ${largeBreakPoint(css`
      `)}

      /*1024px - 1365px*/
      ${xLargeBreakPoint(css`
      `)}

      /* > 1920 */
      ${xxxLargeBreakPoint(css`
          
      `)}

    `
    ];
  }

  constructor() {
    super();
  }

  firstUpdated(){
   
  }

  openME(){
    (this.shadowRoot!.querySelector(".tooltip") as unknown as SlDropdown).hide()
    let tab = manifest_fields[this.field].location;
    let event = new CustomEvent('open-manifest-editor', {
      detail: {
          field: this.field,
          tab: tab
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
    <div class="mic-wrapper">
      <sl-dropdown distance="10" placement="left" class="tooltip">
        <button slot="trigger" type="button" class="right" class="nav_link nav_button">
          <img src="assets/tooltip.svg" alt="info symbol, additional information available on hover" />
        </button>
        <div class="info-box">
          ${manifest_fields[this.field].description.map((line: String) => html`<p class="info-blurb">${line}</p>`)}
          ${manifest_fields[this.field].image ? 

            html`
               <div class="image-section">
                  <img src="${manifest_fields[this.field].image!}" alt=${`example of ${this.field} in use.`} />
               </div>
            ` :
            html``
            
          }
          <div class="mic-actions">
            <a class="learn-more" href="${manifest_fields[this.field].docs_link ?? "https://docs.pwabuilder.com"}" target="blank" rel="noopener noreferrer">Learn More</a>
            <button type="button" @click=${() => this.openME()}>Edit in Manifest</button>
          </div>
        </div>
      </sl-dropdown>
    </div>
    `;
  }
}