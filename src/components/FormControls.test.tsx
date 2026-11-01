import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Field } from "./Field";
import { FormActions } from "./FormActions";
import { InputGroup } from "./InputGroup";
import { SearchInput, TextInput } from "./TextInput";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

afterEach(cleanup);

describe("Field (UI-TW-005)", () => {
  it("月入力を含むFieldの最小幅を内容幅に固定しない（#920）", () => {
    const { container } = render(
      <Field id="month" label="達成した月">
        <TextInput type="month" />
      </Field>,
    );
    const field = container.firstElementChild!;
    expect(field.classList.contains("min-w-0")).toBe(true);
    expect(field.classList.contains("grid-cols-[minmax(0,1fr)]")).toBe(true);
    expect(
      screen.getByLabelText("達成した月").classList.contains("max-w-full"),
    ).toBe(true);
  });
  it("label・description・control・errorを関連付ける", () => {
    render(
      <Field
        description="英小文字・数字・ハイフンで入力します。"
        error="この公開URLは使用できません。"
        id="public-slug"
        label="公開URL"
        requirement="required"
      >
        <TextInput aria-describedby="existing-help" />
      </Field>,
    );

    const input = screen.getByLabelText("公開URL") as HTMLInputElement;
    const description = screen.getByText(
      "英小文字・数字・ハイフンで入力します。",
    );
    const error = screen.getByRole("alert");

    expect(input.id).toBe("public-slug");
    expect(input.required).toBe(true);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual([
      "existing-help",
      description.id,
      error.id,
    ]);
    expect(screen.getByText("必須")).not.toBeNull();

    const position = description.compareDocumentPosition(input);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    const errorPosition = input.compareDocumentPosition(error);
    expect(errorPosition & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });

  it("任意表示ではnative requiredもfalseへ揃える", () => {
    render(
      <Field id="introduction" label="紹介文" requirement="optional">
        <TextArea required />
      </Field>,
    );

    const input = screen.getByLabelText("紹介文") as HTMLTextAreaElement;
    expect(input.required).toBe(false);
    expect(screen.getByText("任意")).not.toBeNull();
    expect(input.hasAttribute("aria-invalid")).toBe(false);
  });

  it("条件付きfalseのerrorでは空のalertとinvalidを作らない", () => {
    render(
      <Field error={false} id="conditional" label="タイトル">
        <TextInput />
      </Field>,
    );

    const input = screen.getByLabelText("タイトル");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(input.hasAttribute("aria-invalid")).toBe(false);
  });
});

describe("Form controls (UI-TW-005)", () => {
  it("TextInputがnative属性とstandard sizeを透過する", () => {
    render(
      <TextInput
        disabled
        id="title"
        maxLength={120}
        placeholder="タイトル"
        required
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.required).toBe(true);
    expect(input.maxLength).toBe(120);
    expect(input.className).toContain("min-h-control-standard");
    expect(input.className).toContain("rounded-note-sm");
  });

  it("compact inputとSearchInputを同じrecipeで表現する", () => {
    render(
      <>
        <TextInput aria-label="期限" controlSize="compact" type="date" />
        <SearchInput aria-label="検索" />
      </>,
    );

    expect(screen.getByLabelText("期限").className).toContain(
      "min-h-control-compact",
    );
    const search = screen.getByRole("searchbox") as HTMLInputElement;
    expect(search.type).toBe("search");
    expect(search.className).toContain("min-h-control-standard");
  });

  it("SelectとTextAreaがnative属性を維持する", () => {
    render(
      <>
        <Select aria-label="公開状態" defaultValue="private">
          <option value="private">非公開</option>
          <option value="public">公開中</option>
        </Select>
        <TextArea aria-label="紹介文" maxLength={300} rows={4} />
      </>,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("private");
    expect(select.className).toContain("min-h-control-standard");

    const textarea = screen.getByLabelText("紹介文") as HTMLTextAreaElement;
    expect(textarea.maxLength).toBe(300);
    expect(textarea.rows).toBe(4);
    expect(textarea.className).toContain("min-h-24");
  });
});

describe("InputGroup (UI-TW-005)", () => {
  it("prefix付き入力へFieldのARIAを転送する", () => {
    render(
      <Field
        description="公開ノートのURLに使います。"
        error="入力内容を確認してください。"
        id="grouped-slug"
        label="公開URL"
      >
        <InputGroup prefix="/u/">
          <TextInput aria-describedby="existing-group-help" />
        </InputGroup>
      </Field>,
    );

    const input = screen.getByLabelText("公開URL");
    const description = screen.getByText("公開ノートのURLに使います。");
    const error = screen.getByRole("alert");

    expect(input.id).toBe("grouped-slug");
    expect(input.className).toContain("border-0");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toEqual([
      "existing-group-help",
      description.id,
      error.id,
    ]);
    expect(screen.getByText("/u/").parentElement?.className).toContain(
      "border-danger",
    );
  });
});

describe("FormActions (UI-TW-005)", () => {
  it("feedbackの後にDOM順を変えず操作を並べる", () => {
    render(
      <FormActions feedback={<p role="status">保存できます。</p>}>
        <Button size="standard" variant="primary">
          保存する
        </Button>
        <Button size="standard" variant="secondary">
          キャンセル
        </Button>
      </FormActions>,
    );

    const feedback = screen.getByRole("status");
    const save = screen.getByRole("button", { name: "保存する" });
    const cancel = screen.getByRole("button", { name: "キャンセル" });
    const actionRow = save.parentElement;

    expect(
      feedback.compareDocumentPosition(save) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
    expect(
      save.compareDocumentPosition(cancel) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
    expect(actionRow?.className).toContain("flex-col");
    expect(actionRow?.className).toContain("sm:flex-row");
    expect(actionRow?.className).toContain("sm:justify-end");
  });
});

describe("UX-INPUT-904 入力時の文字サイズ", () => {
  it.each(["date", "month", "time", "datetime-local"])(
    "%sのnative pickerは維持し、Safariの標準外観による幅の制約を外す",
    (type) => {
      render(<TextInput aria-label="日付条件" type={type} />);
      const input = screen.getByLabelText("日付条件");
      expect(input.getAttribute("type")).toBe(type);
      expect(input.classList.contains("appearance-none")).toBe(true);
      expect(input.classList.contains("block")).toBe(true);
    },
  );
  it.each(["standard", "compact"] as const)(
    "%sでも入力文字を16px相当で表示する",
    (controlSize) => {
      render(
        <>
          <TextInput aria-label="題名" controlSize={controlSize} />
          <TextInput aria-label="日付" controlSize={controlSize} type="date" />
          <SearchInput aria-label="絞り込み" controlSize={controlSize} />
          <Select aria-label="種類" controlSize={controlSize}>
            <option>体験</option>
          </Select>
          <TextArea aria-label="メモ" controlSize={controlSize} />
        </>,
      );
      for (const name of ["題名", "日付", "絞り込み", "種類", "メモ"]) {
        const control = screen.getByLabelText(name);
        expect(control.classList.contains("text-base")).toBe(true);
        expect(control.classList.contains("min-w-0")).toBe(true);
        expect(control.classList.contains("w-full")).toBe(true);
        expect(control.classList.contains("text-xs")).toBe(false);
        expect(control.classList.contains("text-sm")).toBe(false);
      }
    },
  );
});
