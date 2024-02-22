import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { itISWalletAddress } from "../service/controll.js";

describe("itISWalletAddress()", () => {
  beforeAll(() => {
    global.alert = vi.fn();
  });

  it("controls that the address is a correct/complete EVM address", () => {
    // AAA Arrange, Act, Assert

    // Arrange
    const address = "0x68b0fcf47729688097709d98fa4dec4643a96959";

    // Act
    const func = itISWalletAddress(address);

    //Assert
    expect(func).not.toBeNull();
    expect(global.alert).not.toHaveBeenCalled();
  });

  it("Alert if it is not a address with less then 40 char", () => {
    const address = "0x68b0fcf47729688097709d98f";

    const func = itISWalletAddress(address);

    expect(func).toBeNull();
    expect(global.alert).toHaveBeenCalledWith(
      "Enter a correct/complete address!",
    );
  });

  it("Alert if it is not a address with more then 40 char", () => {
    const address = "0x68b0fcf47729688097709d98f9688097709d98f9688097709d98f";

    const func = itISWalletAddress(address);

    expect(func).toBeNull();
    expect(global.alert).toHaveBeenCalledWith(
      "Enter a correct/complete address!",
    );
  });

  it("Alert if the address do not start with 0x", () => {
    const notEvmAddress = "9x68b0fcf47729688097709d98fa4dec4643a9695997709d98f";

    const func = itISWalletAddress(notEvmAddress);

    expect(func).toBeNull();
    expect(global.alert).toHaveBeenCalledWith(
      "Enter a correct/complete address!",
    );
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
});
