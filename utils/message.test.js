const expect = require("expect");
const { generateMessage } = require("./message");

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from = "asdsa";
        text = "some random text";
        message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("string");
    expect(message).toMatchObject({ from, text });
  });
});
