'use client';

import { PopupBean } from '../(ui)/game/page';

const GHOSTS_ENABLED_KEY = 'devtools_ghosts_enabled';
const WEAPON_TYPE_KEY = 'devtools_weapon_type';
const INVINCIBLE_KEY = 'devtools_invincible';

export function initDevTools(): () => void {
    devToolsSetGhostsEnabled(true);
    devToolsSetWeaponType("Bullet");
    devToolsSetInvincible(false);

    const keyDown = (e: KeyboardEvent) => {
        if ('KeyG' === e.code) devToolsSetGhostsEnabled(!devToolsGhostsEnabled());
        else if ('KeyQ' === e.code) devToolsSetWeaponType(devToolsGetWeaponType() === "Bullet" ? "Sword" : "Bullet");
        else if ('KeyI' === e.code) devToolsSetInvincible(!devToolsInvincible());
    }

    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
}

export function devToolsGhostsEnabled(): boolean {
    if (typeof window === 'undefined') return true;
    return 'true' === window.localStorage.getItem(GHOSTS_ENABLED_KEY)
}

export function devToolsGetWeaponType(): string {
    return window.localStorage.getItem(WEAPON_TYPE_KEY)!;
}

export function devToolsInvincible(): boolean {
    return 'true' === window.localStorage.getItem(INVINCIBLE_KEY);
}

function devToolsSetGhostsEnabled(enabled: boolean): void {
    window.localStorage.setItem(GHOSTS_ENABLED_KEY, String(enabled));
    onSettingChanged(GHOSTS_ENABLED_KEY, String(enabled));
}

function devToolsSetWeaponType(type: string): void {
    window.localStorage.setItem(WEAPON_TYPE_KEY, type);
    onSettingChanged(WEAPON_TYPE_KEY, type);
}

function devToolsSetInvincible(invincible: boolean): void {
    window.localStorage.setItem(INVINCIBLE_KEY, String(invincible));
    onSettingChanged(INVINCIBLE_KEY, String(invincible));
}

function onSettingChanged(settingType: string, value: string) {
    window.dispatchEvent(
        new CustomEvent<PopupBean>('newPopup', {
            detail: {
                x: 700,
                y: 50,
                text: settingType + ": " + value,
                time: 6000,
                fontSize: 16
            },
        })
    );
}
