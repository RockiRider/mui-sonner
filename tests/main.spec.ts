/* eslint-disable no-undef */
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Basic functionality", () => {
  test("toast is rendered and disappears after the default timeout", async ({
    page,
  }) => {
    await page.getByTestId("basic_btn").click();
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(1);
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(0);
  });

  test("main toast types are rendered correctly", async ({ page }) => {
    await page.getByTestId("success_btn").click();
    await expect(
      page.getByText("My Success Toast", { exact: true })
    ).toHaveCount(1);

    await page.getByTestId("error_btn").click();
    await expect(page.getByText("My Error Toast", { exact: true })).toHaveCount(
      1
    );

    await page.getByTestId("warning_btn").click();
    await expect(
      page.getByText("My Warning Toast", { exact: true })
    ).toHaveCount(1);

    await page.getByTestId("info_btn").click();
    await expect(page.getByText("My Info Toast", { exact: true })).toHaveCount(
      1
    );
  });

  test("loading toast is rendered correctly, with icon", async ({ page }) => {
    await page.getByTestId("loading_btn").click();
    await expect(page.getByTestId("circular_progress")).toHaveCount(1);
    await expect(
      page.getByText("My Loading Toast", { exact: true })
    ).toHaveCount(1);
  });

  test("show correct toast content based on promise state", async ({
    page,
  }) => {
    await page.getByTestId("promise_success_btn").click();
    await expect(page.getByText("Loading Success")).toHaveCount(1);
    await expect(page.getByText("Promise Success")).toHaveCount(1);
    await page.getByTestId("promise_error_btn").click();
    await expect(page.getByText("Loading Error")).toHaveCount(1);
    await expect(page.getByText("Promise Error")).toHaveCount(1);
  });

  test("toast is removed after swiping down", async ({ page }) => {
    await page.getByTestId("basic_btn").click();
    await page.hover("[data-sonner-toast]");
    await page.mouse.down();
    await page.mouse.move(0, 800);
    await page.mouse.up();
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(0);
  });

  test("dismissible toast is not removed when dragged", async ({ page }) => {
    await page.getByTestId("non_dismissible_btn").click();
    const toast = page.locator("[data-sonner-toast]");
    const dragBoundingBox = await toast.boundingBox();

    if (!dragBoundingBox) return;
    await page.mouse.move(
      dragBoundingBox.x + dragBoundingBox.width / 2,
      dragBoundingBox.y
    );

    await page.mouse.down();
    await page.mouse.move(0, dragBoundingBox.y + 300);

    await page.mouse.up();
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(1);
  });

  test.skip("toast is removed after swiping up", async ({ page }) => {
    await page.goto("/?position=top-left");
    await page.getByTestId("default-button").click();
    await page.hover("[data-sonner-toast]");
    await page.mouse.down();
    await page.mouse.move(0, -800);
    await page.mouse.up();
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(0);
  });

  test.skip("toast is not removed when hovered", async ({ page }) => {
    await page.getByTestId("default-button").click();
    await page.hover("[data-sonner-toast]");
    const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
    await timeout;
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(1);
  });

  test.skip("toast is not removed if duration is set to infinity", async ({
    page,
  }) => {
    await page.getByTestId("infinity-toast").click();
    await page.hover("[data-sonner-toast]");
    const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
    await timeout;
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(1);
  });

  test.skip("toast is not removed when event prevented in action", async ({
    page,
  }) => {
    await page.getByTestId("action-prevent").click();
    await page.locator("[data-button]").click();
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(1);
  });

  test.skip("toast's auto close callback gets executed correctly", async ({
    page,
  }) => {
    await page.getByTestId("auto-close-toast-callback").click();
    await expect(page.getByTestId("auto-close-el")).toHaveCount(1);
  });

  test.skip("toast's dismiss callback gets executed correctly", async ({
    page,
  }) => {
    await page.getByTestId("dismiss-toast-callback").click();
    const toast = page.locator("[data-sonner-toast]");
    const dragBoundingBox = await toast.boundingBox();

    if (!dragBoundingBox) return;
    await page.mouse.move(
      dragBoundingBox.x + dragBoundingBox.width / 2,
      dragBoundingBox.y
    );

    await page.mouse.down();
    await page.mouse.move(0, dragBoundingBox.y + 300);

    await page.mouse.up();
    await expect(page.getByTestId("dismiss-el")).toHaveCount(1);
  });

  test.skip("return focus to the previous focused element", async ({
    page,
  }) => {
    await page.getByTestId("custom").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(1);
    await page.getByTestId("dismiss-button").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-sonner-toast]")).toHaveCount(0);
    await expect(page.getByTestId("custom")).toBeFocused();
  });

  test.skip("toaster's dir prop is reflected correctly", async ({ page }) => {
    await page.goto("/?dir=rtl");
    await page.getByTestId("default-button").click();
    await expect(page.locator("[data-sonner-toaster]")).toHaveAttribute(
      "dir",
      "rtl"
    );
  });

  test.skip("toaster respects the HTML's dir attribute", async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute("dir", "rtl");
    });
    await page.getByTestId("default-button").click();
    await expect(page.locator("[data-sonner-toaster]")).toHaveAttribute(
      "dir",
      "rtl"
    );
  });

  test.skip("toaster respects its own dir attribute over HTML's", async ({
    page,
  }) => {
    await page.goto("/?dir=ltr");
    await page.evaluate(() => {
      document.documentElement.setAttribute("dir", "rtl");
    });
    await page.getByTestId("default-button").click();
    await expect(page.locator("[data-sonner-toaster]")).toHaveAttribute(
      "dir",
      "ltr"
    );
  });

  test.skip("show correct toast content when updating", async ({ page }) => {
    await page.getByTestId("update-toast").click();
    await expect(page.getByText("My Unupdated Toast")).toHaveCount(0);
    await expect(page.getByText("My Updated Toast")).toHaveCount(1);
  });

  test.skip("action button is rendered with custom styles", async ({
    page,
  }) => {
    await page.getByTestId("action").click();
    const button = await page.locator("[data-button]");

    await expect(button).toHaveCSS("background-color", "rgb(219, 239, 255)");
  });
});
