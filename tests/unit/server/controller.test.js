import { describe, jest, beforeEach, expect, test } from "@jest/globals";
import { Controller } from "../../../server/controller";
import { Service } from "../../../server/service";
import TestUtil from "../_util/testUtil";

describe("#Controller - test suite for controller calls", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#getFileStream", async () => {
    const mockStream = TestUtil.generateReadableStream(["test"]);
    const mockType = ".html";
    const mockFileName = "test.html";

    jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockResolvedValue({ stream: mockStream, type: mockType });

    const controller = new Controller();
    const { stream, type } = await controller.getFileStream(mockFileName);

    expect(stream).toStrictEqual(mockStream);
    expect(type).toStrictEqual(mockType);
  });
});
