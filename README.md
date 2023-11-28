The Tableau Viz Extension, created by [Lyons Tech](https://lyonstech.io).

# Install Steps
1. Install the original [Tableau Viz LWC](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000GF1cSUAT) in your org.
2. Deploy the [Message Channel](https://github.com/LyonsTechLLC/Tableau-Viz-Extension/blob/main/force-app/main/default/messageChannels/TableauVizExtensionMessageChannel.messageChannel-meta.xml).
3. Deploy the [LWC](https://github.com/LyonsTechLLC/Tableau-Viz-Extension/tree/main/force-app/main/default/lwc/tableauVizExtension).

# How To Use
Drag the Tableau Viz Extension component on an application or record page and configure how you would normally configure the original Tableau Viz LWC.

Afterwards, you can pass parameters to the Tableau dashboard by sending a message on the `TableauVizExtensionMessageChannel__c` message channel.

```javascript
import { LightningElement, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import TABLEAU_VIZ_EXTENSION_MC from '@salesforce/messageChannel/TableauVizExtensionMessageChannel__c';

export default class DemoComponent extends LightningElement {
    @wire(MessageContext)
    messageContext;

    publishMessage() {
        publish(
            this.messageContext,
            TABLEAU_VIZ_EXTENSION_MC,
            {
                parameters: {
                    parameterNameOne: value,
                    parameterNameTwo: value
                }
            }
        );
    }
}
```
More information can be found [here](http://lyonstech.io/blog/tableau-viz-lwc-extended/).