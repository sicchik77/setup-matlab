// Copyright 2020 The MathWorks, Inc.

import * as exec from "@actions/exec";
import * as toolCache from "@actions/tool-cache";

/**
 * Download and run a script on the runner.
 *
 * @param platform Operating system of the runner (e.g., "win32" or "linux").
 * @param url URL of the script to run.
 * @param args Arguments to pass to the script.
 */
export async function downloadAndRunScript(platform: string, url: string, args?: string[]) {
    const scriptPath = await toolCache.downloadTool(url);
    const cmd = generateExecCommand(platform, scriptPath);

    const exitCode = await exec.exec(cmd, args);

    if (exitCode !== 0) {
        return Promise.reject(Error(`Script exited with non-zero code ${exitCode}`));
    }
}

/**
 * Generate platform-specific command to run a script.
 *
 * @param platform Operating system of the runner (e.g. "win32" or "linux").
 * @param scriptPath Path to the script (on runner's filesystem).
 */
export function generateExecCommand(platform: string, scriptPath: string): string {
    // Run the install script using bash
    let installCmd = `bash ${scriptPath}`;

    if (platform !== "win32") {
        installCmd = `sudo -E ${installCmd}`;
    }

    return installCmd;
}
