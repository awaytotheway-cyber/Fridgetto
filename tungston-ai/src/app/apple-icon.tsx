import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const P = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1], [4, 1],
  [0, 2], [1, 2], [2, 2], [3, 2],
  [0, 3],
  [0, 4],
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050505", position: "relative" }}>
        {P.map(([col, row]) => {
          const hot = col === 0 && row === 0;
          return (
            <div
              key={`${col}-${row}`}
              style={{
                position: "absolute",
                left: 30 + col * 30 - 11,
                top: 34 + row * 28 - 11,
                width: 22,
                height: 22,
                borderRadius: 999,
                background: hot ? "#ffd400" : "#e8101a",
                boxShadow: hot ? "0 0 18px #ffd400" : "0 0 10px rgba(232,16,26,0.6)",
              }}
            />
          );
        })}
      </div>
    ),
    size,
  );
}
