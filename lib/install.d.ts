export default install;
/**
 * Set up an instance of MATLAB on the runner.
 *
 * First, system dependencies are installed. Then the ephemeral installer script
 * is invoked.
 *
 * @param platform Operating system of the runner (e.g., "win32" or "linux").
 * @param release Release of MATLAB to be set up (e.g., "latest" or "R2020a").
 * @param products Array of products to install (e.g. [MATLAB Simulink Simulink_Test])
 */
export declare function install(platform: string, release: string, products: string[]): Promise<void>;
