import {
    NORMAL_SELECTION_PLUGIN_NAME,
    SelectionManagerService,
    SetBoldCommand,
    SetRangeValuesMutation,
    SetStyleCommand,
    SheetPermissionService,
} from '@univerjs/base-sheets';
import {
    DisposableCollection,
    ICommandService,
    RANGE_TYPE,
    toDisposable,
    Univer,
    UniverPermissionService,
} from '@univerjs/core';
import { Injector } from '@wendellhu/redi';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { BoldMenuItemFactory } from '../menu';
import { createMenuTestBed } from './create-menu-test-bed';

describe('Test menu items', () => {
    let univer: Univer;
    let get: Injector['get'];
    let commandService: ICommandService;
    let disposableCollection: DisposableCollection;

    beforeEach(() => {
        const testBed = createMenuTestBed();

        univer = testBed.univer;
        get = testBed.get;

        commandService = get(ICommandService);
        commandService.registerCommand(SetBoldCommand);
        commandService.registerCommand(SetStyleCommand);
        commandService.registerCommand(SetRangeValuesMutation);

        disposableCollection = new DisposableCollection();
    });

    afterEach(() => {
        univer.dispose();

        disposableCollection.dispose();
    });

    it('Test bold menu item', async () => {
        let activated = false;
        let disabled = false;
        const sheetPermissionService = get(SheetPermissionService);
        const univerPermissionService = get(UniverPermissionService);

        const menuItem = get(Injector).invoke(BoldMenuItemFactory);
        disposableCollection.add(toDisposable(menuItem.activated$!.subscribe((v: boolean) => (activated = v))));
        disposableCollection.add(toDisposable(menuItem.disabled$!.subscribe((v: boolean) => (disabled = v))));
        expect(activated).toBeFalsy();
        expect(disabled).toBeFalsy();

        const selectionManager = get(SelectionManagerService);
        selectionManager.setCurrentSelection({
            pluginName: NORMAL_SELECTION_PLUGIN_NAME,
            unitId: 'test',
            sheetId: 'sheet1',
        });
        selectionManager.add([
            {
                range: { startRow: 0, startColumn: 0, endColumn: 0, endRow: 0, rangeType: RANGE_TYPE.NORMAL },
                primary: {
                    startRow: 0,
                    startColumn: 0,
                    endColumn: 0,
                    endRow: 0,
                    actualRow: 0,
                    actualColumn: 0,
                    isMerged: false,
                    isMergedMainCell: false,
                },
                style: null,
            },
        ]);

        expect(await commandService.executeCommand(SetBoldCommand.id)).toBeTruthy();
        expect(activated).toBe(true);

        expect(sheetPermissionService.getSheetEditable()).toBe(true);
        sheetPermissionService.setSheetEditable(false);
        expect(sheetPermissionService.getSheetEditable()).toBe(false);
        sheetPermissionService.setSheetEditable(true);
        univerPermissionService.setEditable(false);
        expect(sheetPermissionService.getSheetEditable()).toBe(false);
        expect(univerPermissionService.getEditable()).toBe(false);
        univerPermissionService.setEditable(true);
        expect(univerPermissionService.getEditable()).toBe(true);
        expect(sheetPermissionService.getSheetEditable()).toBe(true);
    });
});
