/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
export function clone<T>(originalObject: T): T | null {
    if (!originalObject) {
        return null;
    }

    return JSON.parse(JSON.stringify(originalObject));
}
