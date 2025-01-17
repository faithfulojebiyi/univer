// This file provides operations to change formula selection of sheets.

import { DeviceInputEventType } from '@univerjs/base-render';
import { KeyCode, MetaKeys } from '@univerjs/base-ui';
import { CommandType, IOperation } from '@univerjs/core';

import { META_KEY_CTRL_AND_SHIFT } from '../../common/prompt';

export interface ISelectEditorFormulaOperationParam {
    eventType: DeviceInputEventType;
    keycode?: KeyCode;
    metaKey?: MetaKeys | typeof META_KEY_CTRL_AND_SHIFT;
}

export const SelectEditorFormulaOperation: IOperation<ISelectEditorFormulaOperationParam> = {
    id: 'formula-ui.operation.select-editor-formula',
    type: CommandType.OPERATION,
    handler: (accessor, params) =>
        // const { eventType, keycode } = params;
        // const formulaPromptService = accessor.get(IFormulaPromptService);
        // const editorBridgeService = accessor.get(IEditorBridgeService);

        // switch (keycode) {
        //     case KeyCode.ARROW_DOWN:
        //         formulaPromptService.navigate({ direction: Direction.DOWN });
        //         break;
        //     case KeyCode.ARROW_UP:
        //         formulaPromptService.navigate({ direction: Direction.UP });
        //         break;
        //     // case KeyCode.ENTER:
        //     // case KeyCode.TAB:
        //     //     if (formulaPromptService.isSearching()) {
        //     //         formulaPromptService.accept(true);
        //     //     } else {
        //     //         const editorBridgeParameters = {
        //     //             visible: false,
        //     //             eventType,
        //     //             keycode,
        //     //         };

        //     //         editorBridgeService.changeVisible(editorBridgeParameters);
        //     //     }
        //     //     break;
        //     default:
        //         break;
        // }

        true,
};
